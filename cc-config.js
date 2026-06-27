/* ═══════════════════════════════════════════════════════════════
   25DESIGN — Cookie Consent config (external, host บน GitHub+jsDelivr)
   UI = vanilla-cookieconsent · gate จริง = Wix consentPolicyManager
   แก้ไฟล์นี้ใน GitHub → push → (purge jsDelivr cache ถ้า pin @latest)
   ═══════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  function syncToWix(){
    var mgr = window.consentPolicyManager;
    if (!mgr || typeof mgr.setConsentPolicy !== 'function') return;
    var anl = CookieConsent.acceptedCategory('analytics');
    var adv = CookieConsent.acceptedCategory('advertising');
    mgr.setConsentPolicy({
      essential: true,
      functional: CookieConsent.acceptedCategory('functional'),
      analytics: anl,
      advertising: adv,
      dataToThirdParty: anl || adv
    }).catch(function(e){ console.warn('[cc->wix]', e); });
  }

  CookieConsent.run({
    guiOptions: {
      consentModal: { layout:'box', position:'bottom right', equalWeightButtons:true, flipButtons:false },
      preferencesModal: { layout:'box', equalWeightButtons:true }
    },
    disablePageInteraction: false,
    categories: {
      necessary: { enabled:true, readOnly:true },
      functional: {},
      analytics: {},
      advertising: {}
    },
    language: {
      default: 'th',
      translations: {
        th: {
          consentModal: {
            title: 'เราใส่ใจข้อมูลของคุณ',
            description: 'เว็บไซต์นี้ใช้คุกกี้เพื่อให้การใช้งานราบรื่นและช่วยพัฒนาบริการของเรา คุณเลือกได้ว่าจะอนุญาตคุกกี้ประเภทใด และเปลี่ยนใจได้ทุกเมื่อ',
            acceptAllBtn: 'ยอมรับทั้งหมด',
            acceptNecessaryBtn: 'ปฏิเสธทั้งหมด',
            showPreferencesBtn: 'ตั้งค่า',
            footer: '<a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a>'
          },
          preferencesModal: {
            title: 'การตั้งค่าความเป็นส่วนตัว',
            acceptAllBtn: 'ยอมรับทั้งหมด',
            acceptNecessaryBtn: 'ปฏิเสธทั้งหมด',
            savePreferencesBtn: 'บันทึกการตั้งค่า',
            closeIconLabel: 'ปิด',
            sections: [
              { title:'การใช้คุกกี้', description:'เราใช้คุกกี้เพื่อมอบประสบการณ์ที่ดีที่สุด คุณเลือกเปิด/ปิดแต่ละประเภทได้ตามต้องการ' },
              { title:'คุกกี้จำเป็น', description:'จำเป็นต่อการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดได้', linkedCategory:'necessary' },
              { title:'คุกกี้การทำงาน', description:'จดจำการตั้งค่าของคุณ เช่น ภาษา เพื่อประสบการณ์ที่ดีขึ้น', linkedCategory:'functional' },
              { title:'คุกกี้วิเคราะห์', description:'ช่วยให้เราเข้าใจการใช้งานเว็บไซต์ เพื่อปรับปรุงให้ดีขึ้น', linkedCategory:'analytics' },
              { title:'คุกกี้การตลาด', description:'ใช้แสดงเนื้อหาและโฆษณาที่ตรงกับความสนใจของคุณ', linkedCategory:'advertising' },
              { title:'ติดต่อเรา', description:'หากมีคำถามเรื่องความเป็นส่วนตัว ติดต่อ <a href="mailto:25designservice@gmail.com">25designservice@gmail.com</a>' }
            ]
          }
        }
      }
    },
    onFirstConsent: syncToWix,
    onConsent: syncToWix,
    onChange: syncToWix
  });

  setTimeout(function(){ if (CookieConsent.validConsent()) syncToWix(); }, 1200);
})();

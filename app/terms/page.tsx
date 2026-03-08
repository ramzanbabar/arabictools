import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">الشروط والأحكام</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          آخر تحديث: يناير 2026
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">قبول الشروط</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            باستخدامك لموقع «أدوات عربية» (arabictools.online)، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع. نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم نشر أي تغييرات على هذه الصفحة. استمرارك في استخدام الموقع بعد نشر التغييرات يعني موافقتك على الشروط المعدلة.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">استخدام الخدمة</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            تقدم «أدوات عربية» مجموعة من الأدوات الرقمية المجانية للاستخدام الشخصي والتجاري. عند استخدام خدماتنا، توافق على:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 pe-4">
            <li>استخدام الموقع للأغراض المشروعة فقط</li>
            <li>عدم محاولة الوصول غير المصرح به إلى أي جزء من الموقع</li>
            <li>عدم استخدام أدواتنا لأغراض غير قانونية أو ضارة</li>
            <li>عدم محاولة تعطيل أو إتلاف الموقع أو خدماته</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">الملكية الفكرية</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            جميع المحتويات على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والأيقونات والصور والبرمجيات، هي ملك لـ «أدوات عربية» أو مورديها ومحمية بموجب قوانين حقوق النشر والملكية الفكرية. لا يمنحك استخدام الموقع أي حقوق ملكية على المحتوى. يُسمح لك باستخدام الأدوات لاحتياجاتك الشخصية أو التجارية، لكن لا يُسمح لك بنسخ أو تعديل أو توزيع أو بيع أي جزء من الموقع أو محتواه دون إذن كتابي مسبق.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">إخلاء المسؤولية</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            يتم توفير الخدمة «كما هي» دون أي ضمانات من أي نوع، سواء صريحة أو ضمنية. لا نضمن أن الخدمة ستكون متاحة دائمًا أو خالية من الأخطاء. نحن لا نتحمل أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام الخدمة. الأدوات المقدمة على الموقع هي لأغراض المعلومات والمساعدة العامة، ويجب عدم الاعتماد عليها بشكل حصري للقرارات المهمة دون التحقق المستقل.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">حدود المسؤولية</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            في أقصى حد يسمح به القانون، لن نكون مسؤولين عن أي أضرار بما في ذلك، على سبيل المثال لا الحصر، الأضرار المباشرة أو غير المباشرة أو العرضية أو التبعية أو العقابية الناتجة عن استخدامك للخدمة أو عدم القدرة على استخدامها. هذا يشمل، على سبيل المثال، خسارة الأرباح أو البيانات أو الاستخدام أو غيرها من الخسائر المالية، حتى إذا تم إبلاغنا بإمكانية حدوث مثل هذه الأضرار.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">الروابط الخارجية</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            قد يحتوي موقعنا على روابط لمواقع ويب خارجية لا نديرها. ليس لدينا سيطرة على محتوى أو سياسات الخصوصية أو ممارسات تلك المواقع ولا نتحمل مسؤولية عنها. ننصحك بمراجعة شروط الاستخدام وسياسة الخصوصية الخاصة بأي موقع تزوره عبر الروابط الخارجية.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">التعديلات على الخدمة</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            نحتفظ بالحق في تعديل أو تعليق أو إيقاف أي جزء من الخدمة في أي وقت دون إشعار مسبق. لن نكون مسؤولين عنك أو عن أي طرف ثالث عن أي تعديل أو تعليق أو إيقاف للخدمة. قد نضيف أو نزيل ميزات أو أدوات معينة، وقد نغير واجهة المستخدم أو تصميم الموقع، وكل ذلك دون إشعار مسبق.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">القانون الحاكم</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            تخضع هذه الشروط والأحكام وتفسر وفقًا لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن هذه الشروط أو استخدام الخدمة سيتم حله حصريًا في المحاكم المختصة في المملكة العربية السعودية. أنت توافق على الخضوع للولاية القضائية الحصرية لهذه المحاكم فيما يتعلق بأي نزاع من هذا القبيل.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">الاتصال بنا</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا عبر صفحة{" "}
            <a href="/contact" className="text-primary hover:underline">اتصل بنا</a> أو عبر البريد الإلكتروني: contact@arabictools.online
          </p>
        </section>
      </div>
    </div>
  );
}

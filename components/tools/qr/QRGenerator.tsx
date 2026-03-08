"use client";
import { useState, useEffect, useRef } from "react";
import { use } from "react";

interface Props {
  params?: Promise<{ slug: string }>;
}

export default function QRGenerator(props: Props) {
  const [type, setType] = useState<"url" | "whatsapp" | "vcard" | "wifi" | "text" | "email" | "phone" | "location">("url");
  const [data, setData] = useState({
    url: "",
    phone: "",
    message: "",
    name: "",
    email: "",
    address: "",
    ssid: "",
    password: "",
    wifiSecurity: "WPA",
    text: "",
    lat: "",
    lng: "",
  });
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<unknown>(null);
  const [hasQR, setHasQR] = useState(false);

  // Detect type from URL slug if available
  useEffect(() => {
    const detectType = async () => {
      if (props.params) {
        const { slug } = await props.params;
        const typeMap: Record<string, typeof type> = {
          "qr-rabat-mawqie": "url",
          "qr-whatsapp": "whatsapp",
          "qr-bitaqat-ittisal": "vcard",
          "qr-wifi": "wifi",
          "qr-nass-arabi": "text",
          "qr-bareed-elektrowni": "email",
          "qr-raqm-hatif": "phone",
          "qr-mawqi-jughraffi": "location",
        };
        if (slug && typeMap[slug]) {
          setType(typeMap[slug]);
        }
      }
    };
    detectType();
  }, [props.params]);

  const generateQR = async () => {
    if (!qrRef.current) return;

    try {
      const QRCodeStyling = (await import("qr-code-styling")).default;

      let qrData = "";

      switch (type) {
        case "url":
          qrData = data.url;
          break;
        case "whatsapp":
          qrData = `https://wa.me/${data.phone}?text=${encodeURIComponent(data.message)}`;
          break;
        case "vcard":
          qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${data.name}\nTEL:${data.phone}\nEMAIL:${data.email}\nEND:VCARD`;
          break;
        case "wifi":
          qrData = `WIFI:T:${data.wifiSecurity};S:${data.ssid};P:${data.password};;`;
          break;
        case "text":
          qrData = data.text;
          break;
        case "email":
          qrData = `mailto:${data.email}?subject=${encodeURIComponent(data.message)}`;
          break;
        case "phone":
          qrData = `tel:${data.phone}`;
          break;
        case "location":
          qrData = `geo:${data.lat},${data.lng}`;
          break;
      }

      if (!qrData) return;

      const qr = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data: qrData,
        dotsOptions: { color: fgColor, type: "rounded" },
        backgroundOptions: { color: bgColor },
      });

      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
      qrInstanceRef.current = qr;
      setHasQR(true);
    } catch (e) {
      console.error(e);
    }
  };

  const download = async () => {
    if (qrInstanceRef.current) {
      const qr = qrInstanceRef.current as { download: (opts: { name: string; extension: string }) => void };
      qr.download({ name: "qr-code", extension: "png" });
    }
  };

  const renderInputFields = () => {
    switch (type) {
      case "url":
        return (
          <div>
            <label className="block text-sm font-medium mb-2">الرابط</label>
            <input
              type="url"
              value={data.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              dir="ltr"
            />
          </div>
        );
      case "whatsapp":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">رقم الواتساب</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="966501234567"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الرسالة</label>
              <textarea
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                placeholder="رسالتك هنا..."
                rows={3}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none resize-none"
              />
            </div>
          </div>
        );
      case "vcard":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                dir="ltr"
              />
            </div>
          </div>
        );
      case "wifi":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الشبكة (SSID)</label>
              <input
                type="text"
                value={data.ssid}
                onChange={(e) => setData({ ...data, ssid: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">نوع التشفير</label>
              <select
                value={data.wifiSecurity}
                onChange={(e) => setData({ ...data, wifiSecurity: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">بدون كلمة مرور</option>
              </select>
            </div>
          </div>
        );
      case "text":
        return (
          <div>
            <label className="block text-sm font-medium mb-2">النص</label>
            <textarea
              value={data.text}
              onChange={(e) => setData({ ...data, text: e.target.value })}
              placeholder="أدخل النص هنا..."
              rows={5}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>
        );
      case "email":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الموضوع</label>
              <input
                type="text"
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        );
      case "phone":
        return (
          <div>
            <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="+966501234567"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
              dir="ltr"
            />
          </div>
        );
      case "location":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">خط العرض</label>
              <input
                type="number"
                step="any"
                value={data.lat}
                onChange={(e) => setData({ ...data, lat: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">خط الطول</label>
              <input
                type="number"
                step="any"
                value={data.lng}
                onChange={(e) => setData({ ...data, lng: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                dir="ltr"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <label className="block text-sm font-medium mb-2">نوع QR كود</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="url">رابط موقع</option>
          <option value="whatsapp">واتساب</option>
          <option value="vcard">بطاقة اتصال</option>
          <option value="wifi">واي فاي</option>
          <option value="text">نص</option>
          <option value="email">بريد إلكتروني</option>
          <option value="phone">رقم هاتف</option>
          <option value="location">موقع جغرافي</option>
        </select>
      </div>

      {renderInputFields()}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">لون QR</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">لون الخلفية</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الحجم: {size}px</label>
        <input
          type="range"
          min="128"
          max="512"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={generateQR}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
      >
        توليد QR كود
      </button>

      <div ref={qrRef} className="flex justify-center" />

      {hasQR && (
        <button
          onClick={download}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          تحميل QR كود
        </button>
      )}
    </div>
  );
}

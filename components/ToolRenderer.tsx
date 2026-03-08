"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Skeleton component
function Skeleton() {
  return (
    <div className="h-64 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
  );
}

// Arabic tools (12)
const WordCounter     = dynamic(() => import("@/components/tools/arabic/WordCounter"),     { ssr: false, loading: () => <Skeleton /> });
const TashkeelRemover = dynamic(() => import("@/components/tools/arabic/TashkeelRemover"), { ssr: false, loading: () => <Skeleton /> });
const NumberToWords   = dynamic(() => import("@/components/tools/arabic/NumberToWords"),   { ssr: false, loading: () => <Skeleton /> });
const HijriConverter  = dynamic(() => import("@/components/tools/arabic/HijriConverter"),  { ssr: false, loading: () => <Skeleton /> });
const ArabicKeyboard  = dynamic(() => import("@/components/tools/arabic/ArabicKeyboard"),  { ssr: false, loading: () => <Skeleton /> });
const Transliteration = dynamic(() => import("@/components/tools/arabic/Transliteration"), { ssr: false, loading: () => <Skeleton /> });
const TextNormalizer  = dynamic(() => import("@/components/tools/arabic/TextNormalizer"),  { ssr: false, loading: () => <Skeleton /> });
const LetterFrequency = dynamic(() => import("@/components/tools/arabic/LetterFrequency"), { ssr: false, loading: () => <Skeleton /> });
const LoremArabic     = dynamic(() => import("@/components/tools/arabic/LoremArabic"),     { ssr: false, loading: () => <Skeleton /> });
const NumeralConverter= dynamic(() => import("@/components/tools/arabic/NumeralConverter"),{ ssr: false, loading: () => <Skeleton /> });
const TextDirectionFixer=dynamic(()=>import("@/components/tools/arabic/TextDirectionFixer"),{ssr: false,loading:()=><Skeleton/>});
const TextDiff        = dynamic(() => import("@/components/tools/arabic/TextDiff"),        { ssr: false, loading: () => <Skeleton /> });

// Calculators (10)
const ZakatCalculator = dynamic(() => import("@/components/tools/calculators/ZakatCalculator"),{ ssr: false, loading: () => <Skeleton /> });
const PrayerTimes     = dynamic(() => import("@/components/tools/calculators/PrayerTimes"),    { ssr: false, loading: () => <Skeleton /> });
const VatSA           = dynamic(() => import("@/components/tools/calculators/VatCalculatorSA"),{ ssr: false, loading: () => <Skeleton /> });
const VatUAE          = dynamic(() => import("@/components/tools/calculators/VatCalculatorUAE"),{ssr: false, loading: () => <Skeleton /> });
const SalaryCalc      = dynamic(() => import("@/components/tools/calculators/SalaryCalculator"),{ssr: false,loading:()=> <Skeleton />});
const LoanCalc        = dynamic(() => import("@/components/tools/calculators/LoanCalculator"),  {ssr: false,loading:()=> <Skeleton />});
const BmiCalc         = dynamic(() => import("@/components/tools/calculators/BmiCalculator"),   {ssr: false,loading:()=> <Skeleton />});
const CalorieCalc     = dynamic(() => import("@/components/tools/calculators/CalorieCalculator"),{ssr: false,loading:()=> <Skeleton />});
const AgeCalc         = dynamic(() => import("@/components/tools/calculators/AgeCalculator"),   {ssr: false,loading:()=> <Skeleton />});
const CurrencyConv    = dynamic(() => import("@/components/tools/calculators/CurrencyConverter"),{ssr: false,loading:()=> <Skeleton />});

// PDF (10)
const MergePDF    = dynamic(()=>import("@/components/tools/pdf/MergePDF"),    {ssr: false,loading:()=><Skeleton/>});
const SplitPDF    = dynamic(()=>import("@/components/tools/pdf/SplitPDF"),    {ssr: false,loading:()=><Skeleton/>});
const CompressPDF = dynamic(()=>import("@/components/tools/pdf/CompressPDF"), {ssr: false,loading:()=><Skeleton/>});
const PdfToJpg    = dynamic(()=>import("@/components/tools/pdf/PdfToJpg"),    {ssr: false,loading:()=><Skeleton/>});
const ImagesToPdf = dynamic(()=>import("@/components/tools/pdf/ImagesToPdf"), {ssr: false,loading:()=><Skeleton/>});
const WordToPdf   = dynamic(()=>import("@/components/tools/pdf/WordToPdf"),   {ssr: false,loading:()=><Skeleton/>});
const ExcelToPdf  = dynamic(()=>import("@/components/tools/pdf/ExcelToPdf"),  {ssr: false,loading:()=><Skeleton/>});
const EncryptPDF  = dynamic(()=>import("@/components/tools/pdf/EncryptPDF"),  {ssr: false,loading:()=><Skeleton/>});
const UnlockPDF   = dynamic(()=>import("@/components/tools/pdf/UnlockPDF"),   {ssr: false,loading:()=><Skeleton/>});
const WatermarkPDF= dynamic(()=>import("@/components/tools/pdf/WatermarkPDF"),{ssr: false,loading:()=><Skeleton/>});

// Image (10)
const CompressImage = dynamic(()=>import("@/components/tools/image/CompressImage"),{ssr: false,loading:()=><Skeleton/>});
const ResizeImage   = dynamic(()=>import("@/components/tools/image/ResizeImage"),  {ssr: false,loading:()=><Skeleton/>});
const PngToJpg      = dynamic(()=>import("@/components/tools/image/PngToJpg"),     {ssr: false,loading:()=><Skeleton/>});
const JpgToPng      = dynamic(()=>import("@/components/tools/image/JpgToPng"),     {ssr: false,loading:()=><Skeleton/>});
const ToWebP        = dynamic(()=>import("@/components/tools/image/ToWebP"),       {ssr: false,loading:()=><Skeleton/>});
const CropImage     = dynamic(()=>import("@/components/tools/image/CropImage"),    {ssr: false,loading:()=><Skeleton/>});
const RotateImage   = dynamic(()=>import("@/components/tools/image/RotateImage"),  {ssr: false,loading:()=><Skeleton/>});
const RemoveBg      = dynamic(()=>import("@/components/tools/image/RemoveBg"),     {ssr: false,loading:()=><Skeleton/>});
const AddArabicText = dynamic(()=>import("@/components/tools/image/AddArabicText"),{ssr: false,loading:()=><Skeleton/>});
const HeicToJpg     = dynamic(()=>import("@/components/tools/image/HeicToJpg"),    {ssr: false,loading:()=><Skeleton/>});

// QR (1 component handles all 8 types)
const QRGenerator   = dynamic(()=>import("@/components/tools/qr/QRGenerator"),    {ssr: false,loading:()=><Skeleton/>});

// Developer (8)
const JsonFormatter    = dynamic(()=>import("@/components/tools/developer/JsonFormatter"),    {ssr: false,loading:()=><Skeleton/>});
const Base64Tool       = dynamic(()=>import("@/components/tools/developer/Base64Tool"),       {ssr: false,loading:()=><Skeleton/>});
const UrlEncoderDecoder= dynamic(()=>import("@/components/tools/developer/UrlEncoderDecoder"),{ssr: false,loading:()=><Skeleton/>});
const PasswordGenerator= dynamic(()=>import("@/components/tools/developer/PasswordGenerator"),{ssr: false,loading:()=><Skeleton/>});
const UuidGenerator    = dynamic(()=>import("@/components/tools/developer/UuidGenerator"),    {ssr: false,loading:()=><Skeleton/>});
const HashGenerator    = dynamic(()=>import("@/components/tools/developer/HashGenerator"),    {ssr: false,loading:()=><Skeleton/>});
const RegexTester      = dynamic(()=>import("@/components/tools/developer/RegexTester"),      {ssr: false,loading:()=><Skeleton/>});
const ColorConverter   = dynamic(()=>import("@/components/tools/developer/ColorConverter"),   {ssr: false,loading:()=><Skeleton/>});

// Converters (5)
const CsvJsonConverter = dynamic(()=>import("@/components/tools/converter/CsvJsonConverter"),{ssr: false,loading:()=><Skeleton/>});
const MarkdownPreview  = dynamic(()=>import("@/components/tools/converter/MarkdownPreview"), {ssr: false,loading:()=><Skeleton/>});
const HtmlEntityTool   = dynamic(()=>import("@/components/tools/converter/HtmlEntityTool"),  {ssr: false,loading:()=><Skeleton/>});
const TextToBinary     = dynamic(()=>import("@/components/tools/converter/TextToBinary"),    {ssr: false,loading:()=><Skeleton/>});
const TextSorter       = dynamic(()=>import("@/components/tools/converter/TextSorter"),      {ssr: false,loading:()=><Skeleton/>});

// Component map
const COMPONENTS: Record<string, React.ComponentType> = {
  "aadad-alkaalimat":               WordCounter,
  "izalat-altashkeel":              TashkeelRemover,
  "altarqam-ila-kaalimat":          NumberToWords,
  "tahweel-altaareekh":             HijriConverter,
  "lawhat-almafaateeh-alarabiyya":  ArabicKeyboard,
  "altahweel-alswti":               Transliteration,
  "tatbee-alnass-alarabi":          TextNormalizer,
  "takrar-alhuruf":                 LetterFrequency,
  "nass-tajreebi-arabi":            LoremArabic,
  "tahweel-alarqam-alhindiyya":     NumeralConverter,
  "islaah-ittijah-alnass":          TextDirectionFixer,
  "muqaaranat-alnusos":             TextDiff,
  "haasibat-alzakat":               ZakatCalculator,
  "mawaqeet-assalah":               PrayerTimes,
  "dareeibat-alqeema-almudaafa-ksa":VatSA,
  "dareeibat-alqeema-almudaafa-uae":VatUAE,
  "haasibat-arraatib":              SalaryCalc,
  "haasibat-alqard":                LoanCalc,
  "muashir-katlat-aljism":          BmiCalc,
  "hasibat-assaarat-alharaariyya":  CalorieCalc,
  "hasibat-alumr":                  AgeCalc,
  "muharwil-alemlat":               CurrencyConv,
  "damj-pdf":                       MergePDF,
  "taqseem-pdf":                    SplitPDF,
  "daght-pdf":                      CompressPDF,
  "pdf-ila-suwar":                  PdfToJpg,
  "suwar-ila-pdf":                  ImagesToPdf,
  "word-ila-pdf":                   WordToPdf,
  "excel-ila-pdf":                  ExcelToPdf,
  "tashrif-pdf":                    EncryptPDF,
  "fak-tashrif-pdf":                UnlockPDF,
  "elaama-maeiyya-pdf":             WatermarkPDF,
  "daght-assouwar":                 CompressImage,
  "taghyeer-hajm-assouwar":         ResizeImage,
  "png-ila-jpg":                    PngToJpg,
  "jpg-ila-png":                    JpgToPng,
  "tahweel-ila-webp":               ToWebP,
  "qass-assouwar":                  CropImage,
  "tadweer-assouwar":               RotateImage,
  "izalat-alkhalfiyya":             RemoveBg,
  "idafat-nass-arabi-ala-assouwar": AddArabicText,
  "heic-ila-jpg":                   HeicToJpg,
  "qr-rabat-mawqie":                QRGenerator,
  "qr-whatsapp":                    QRGenerator,
  "qr-bitaqat-ittisal":             QRGenerator,
  "qr-wifi":                        QRGenerator,
  "qr-nass-arabi":                  QRGenerator,
  "qr-bareed-elektrowni":           QRGenerator,
  "qr-raqm-hatif":                  QRGenerator,
  "qr-mawqi-jughraffi":             QRGenerator,
  "munsiq-json":                    JsonFormatter,
  "tarmeez-base64":                 Base64Tool,
  "tarmeez-url":                    UrlEncoderDecoder,
  "muwallid-kalima-almarur":        PasswordGenerator,
  "muwallid-uuid":                  UuidGenerator,
  "muwallid-hash":                  HashGenerator,
  "mukhtabar-regex":                RegexTester,
  "muharwil-alawaan":               ColorConverter,
  "csv-ila-json":                   CsvJsonConverter,
  "markdown-ila-html":              MarkdownPreview,
  "tarmeez-html-entities":          HtmlEntityTool,
  "nass-ila-athnai":                TextToBinary,
  "muwallid-lorem-ipsum":           LoremArabic,
  "tarteeb-alnusos":                TextSorter,
  "muqaaranat-csv":                 CsvJsonConverter,
};

interface ToolRendererProps {
  slug: string;
}

export default function ToolRenderer({ slug }: ToolRendererProps) {
  const ToolComponent = COMPONENTS[slug];
  
  if (!ToolComponent) {
    return (
      <div className="text-center py-8 text-gray-500">
        الأداة غير موجودة
      </div>
    );
  }

  return <ToolComponent />;
}

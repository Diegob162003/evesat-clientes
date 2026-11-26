import logoPng from "@/assets/logo-evesat.png";

export const LOGO_URL = logoPng;

export function Logo({ className = "h-10 w-10", alt = "EVESAT" }: { className?: string; alt?: string }) {
  return <img src={LOGO_URL} alt={alt} className={`${className} object-contain`} />;
}

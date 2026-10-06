import { Apple, Gem, Headphones, Laptop, Shirt, Smartphone, Sofa, Sparkles, type LucideProps } from "lucide-react";
import type { IconName } from "@/data/categories";

const map = { Apple, Gem, Headphones, Laptop, Shirt, Smartphone, Sofa, Sparkles };

export function CategoryIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name];
  return <Icon {...props} />;
}

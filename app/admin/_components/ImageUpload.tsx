"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon" className="h-8 w-8 rounded-lg shadow-xl">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <img className="object-cover h-full w-full" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="ecommerce">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="outline"
              onClick={onClick}
              className="h-24 w-full rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-slate-50 transition-all font-bold text-slate-500"
            >
              <ImagePlus className="h-6 w-6 mr-3" />
              Upload Product Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

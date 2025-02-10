"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { X } from "lucide-react";
import Image from "next/image";
import { ImageResponse } from "@/shared/services/get-image.service";

interface ImageInputProps {
  name: string;
  label: string;
  defaultValue?: ImageResponse | string | null;
  error?: string;
  multiple?: boolean;
}

export const ImageInput = ({
  name,
  label,
  defaultValue,
  error,
  multiple = false,
}: ImageInputProps) => {
  const [previews, setPreviews] = useState<string[]>(() => {
    if (!defaultValue) return [];
    if (Array.isArray(defaultValue)) {
      return defaultValue.map(v => typeof v === 'string' ? v : v.base64);
    }
    return [typeof defaultValue === 'string' ? defaultValue : defaultValue.base64];
  });

  const [filenames, setFilenames] = useState<string[]>(() => {
    if (!defaultValue || typeof defaultValue === 'string') return [];
    if (Array.isArray(defaultValue)) {
      return defaultValue.map(v => typeof v === 'string' ? '' : v.filename);
    }
    return [defaultValue.filename];
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => multiple ? [...prev, reader.result as string] : [reader.result as string]);
          setFilenames(prev => multiple ? [...prev, ''] : ['']);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemove = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setFilenames(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex flex-wrap gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              src={preview}
              alt={`Preview ${index + 1}`}
              width={100}
              height={100}
              className="object-cover rounded-md"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700"
              onClick={() => handleRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          multiple={multiple}
          ref={fileInputRef}
        />
        {filenames.map((filename, index) => (
          filename && (
            <Input
              key={index}
              type="hidden"
              name={`${name}_filenames`}
              value={filename}
            />
          )
        ))}
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
        >
          Seleccionar {multiple ? "imágenes" : "imagen"}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

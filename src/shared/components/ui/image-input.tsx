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
}

export const ImageInput = ({
  name,
  label,
  defaultValue,
  error,
}: ImageInputProps) => {
  const [preview, setPreview] = useState<string | null>(() => {
    if (!defaultValue) {
      return null;
    }
    if (typeof defaultValue === 'string') {
      return defaultValue;
    }
    return defaultValue.base64;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        {preview && (
          <div className="relative">
            <Image
              src={preview}
              alt="Preview"
              width={100}
              height={100}
              className="object-contain rounded-md"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <Input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
        >
          Seleccionar imagen
        </Button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

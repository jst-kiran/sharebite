import { useState } from "react";
import FoodImage from "../common/FoodImage";

/**
 * Reusable Image Upload component with drag-and-drop & live preview via FoodImage.
 */
function ImageUpload({ label = "Food Image Upload", onImageChange, className = "" }) {
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (onImageChange) onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemove() {
    setPreview(null);
    if (onImageChange) onImageChange(null);
  }

  return (
    <div className={className}>
      {label && <label className="field-label">{label}</label>}

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-ink/15 bg-white p-2">
          <FoodImage
            src={preview}
            alt="Upload Preview"
            aspectRatio="aspect-[4/3]"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-4 right-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink/20 bg-stone/30 p-6 text-center transition-colors hover:border-forest hover:bg-stone/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest mb-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-forest-dark">
            Click to upload or drag & drop food photo
          </span>
          <span className="mt-1 text-xs text-ink/50">
            PNG, JPG, or WEBP up to 5MB (Preview supported)
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

export default ImageUpload;

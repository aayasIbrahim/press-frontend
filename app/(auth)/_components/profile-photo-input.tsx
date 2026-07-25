"use client"

import { useRef, useState, useCallback } from "react"
import { Camera, Upload, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ProfilePhotoInputProps {
  value: File | null
  onChange: (file: File | null) => void
  fallback?: string
  disabled?: boolean
}

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export function ProfilePhotoInput({
  value,
  onChange,
  fallback = "?",
  disabled,
}: ProfilePhotoInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File | undefined) => {
      setError(null)
      if (!file) return

      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file.")
        return
      }
      if (file.size > MAX_SIZE) {
        setError("Image must be smaller than 5MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
      onChange(file)
    },
    [onChange],
  )

  const clear = useCallback(() => {
    setPreview(null)
    setError(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }, [onChange])

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="group relative rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Upload profile photo"
        >
          <Avatar className="size-24 border border-border">
            {preview ? (
              <AvatarImage src={preview || "/placeholder.svg"} alt="Profile photo preview" />
            ) : null}
            <AvatarFallback className="bg-muted text-muted-foreground text-lg">
              {fallback}
            </AvatarFallback>
          </Avatar>
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/50 text-background opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="size-6" aria-hidden="true" />
          </span>
        </button>

        {value ? (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={clear}
            disabled={disabled}
            className="absolute -right-1 -top-1 size-7 rounded-full shadow"
            aria-label="Remove photo"
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
      >
        <Upload className="size-4" aria-hidden="true" />
        {value ? "Change photo" : "Upload photo"}
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={disabled}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">PNG or JPG, up to 5MB.</p>
      )}
    </div>
  )
}

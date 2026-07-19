"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Kashmir",
  "Islamabad Capital Territory",
];

const MAJOR_CITIES: Record<string, string[]> = {
  Punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Multan", "Sialkot", "Sargodha", "Bahawalpur"],
  Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas"],
  "Khyber Pakhtunkhwa": ["Peshawar", "Abbottabad", "Mardan", "Mingora", "Kohat", "Bannu"],
  Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Hub"],
  "Gilgit-Baltistan": ["Gilgit", "Skardu", "Ghanche", "Diamer"],
  "Azad Kashmir": ["Muzaffarabad", "Mirpur", "Rawalakot", "Bagh"],
  "Islamabad Capital Territory": ["Islamabad"],
};

interface FieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any;
}

interface InputFieldProps {
  label: string;
  fieldName: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  className?: string;
}

function InputField({
  label,
  fieldName,
  placeholder,
  required,
  type = "text",
  icon,
  register,
  errors,
  className,
}: InputFieldProps) {
  const error = errors[fieldName];

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={fieldName}
        className="flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider"
      >
        {label}
        {required && <span className="text-[#E9CC2F]">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
            {icon}
          </div>
        )}
        <motion.input
          id={fieldName}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldName}-error` : undefined}
          {...register(fieldName)}
          whileFocus={{ scale: 1.005 }}
          className={cn(
            "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/40 focus:border-[#E9CC2F]/60",
            icon ? "pl-10" : "pl-4",
            error
              ? "border-red-500/60 bg-red-500/5 focus:ring-red-500/20"
              : "border-white/10 hover:border-white/20"
          )}
        />
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${fieldName}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
            {error.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  fieldName: string;
  options: string[];
  required?: boolean;
  icon?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  className?: string;
  disabled?: boolean;
}

function SelectField({
  label,
  fieldName,
  options,
  required,
  icon,
  register,
  errors,
  className,
  disabled,
}: SelectFieldProps) {
  const error = errors[fieldName];

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={fieldName}
        className="flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider"
      >
        {label}
        {required && <span className="text-[#E9CC2F]">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10">
            {icon}
          </div>
        )}
        <select
          id={fieldName}
          disabled={disabled}
          aria-invalid={!!error}
          {...register(fieldName)}
          className={cn(
            "w-full appearance-none rounded-xl border bg-[#1A1A1A] px-4 py-3 text-sm text-white transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/40 focus:border-[#E9CC2F]/60",
            icon ? "pl-10" : "pl-4",
            disabled && "opacity-50 cursor-not-allowed",
            error
              ? "border-red-500/60"
              : "border-white/10 hover:border-white/20"
          )}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#1A1A1A] text-white">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
            {error.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CustomerInformation({ register, errors, watch }: FieldProps) {
  const selectedProvince = watch("province") as string;
  const cities = MAJOR_CITIES[selectedProvince] ?? ["Select Province First"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl border border-white/10 bg-[#1A1A1A]/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9CC2F]/10 border border-[#E9CC2F]/20">
          <User className="h-[18px] w-[18px] text-[#E9CC2F]" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Delivery Information</h2>
          <p className="text-xs text-white/40">Fields marked with * are required</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-5">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            fieldName="firstName"
            placeholder="Muhammad"
            required
            icon={<User className="h-4 w-4" />}
            register={register}
            errors={errors}
          />
          <InputField
            label="Last Name"
            fieldName="lastName"
            placeholder="Ali"
            required
            register={register}
            errors={errors}
          />
        </div>

        {/* Phone Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Phone Number"
            fieldName="phone"
            placeholder="03001234567"
            required
            type="tel"
            icon={<Phone className="h-4 w-4" />}
            register={register}
            errors={errors}
          />
          <InputField
            label="Alternative Phone"
            fieldName="altPhone"
            placeholder="03211234567 (optional)"
            type="tel"
            icon={<Phone className="h-4 w-4" />}
            register={register}
            errors={errors}
          />
        </div>

        {/* Email */}
        <InputField
          label="Email Address"
          fieldName="email"
          placeholder="muhammad@example.com (optional)"
          type="email"
          icon={<Mail className="h-4 w-4" />}
          register={register}
          errors={errors}
        />

        {/* Location Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Country (Readonly) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Country
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-lg">🇵🇰</span>
              <span className="text-sm text-white/70">Pakistan</span>
              <span className="ml-auto text-[10px] text-[#E9CC2F] font-medium uppercase tracking-wider bg-[#E9CC2F]/10 rounded-md px-2 py-0.5">
                Only
              </span>
            </div>
          </div>

          {/* Province */}
          <SelectField
            label="Province"
            fieldName="province"
            options={PROVINCES}
            required
            register={register}
            errors={errors}
          />
        </div>

        {/* City & Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="City"
            fieldName="city"
            options={cities}
            required
            icon={<MapPin className="h-4 w-4" />}
            register={register}
            errors={errors}
          />
          <InputField
            label="Area / Neighbourhood"
            fieldName="area"
            placeholder="Gulberg, DHA, Model Town..."
            register={register}
            errors={errors}
          />
        </div>

        {/* Full Address */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address"
            className="flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider"
          >
            Complete Address <span className="text-[#E9CC2F]">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
            <motion.textarea
              id="address"
              placeholder="House/Flat No., Street, Block, Sector..."
              aria-invalid={!!errors.address}
              rows={3}
              {...register("address")}
              whileFocus={{ scale: 1.005 }}
              className={cn(
                "w-full resize-none rounded-xl border bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/40 focus:border-[#E9CC2F]/60",
                errors.address
                  ? "border-red-500/60 bg-red-500/5"
                  : "border-white/10 hover:border-white/20"
              )}
            />
          </div>
          <AnimatePresence mode="wait">
            {errors.address && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                className="text-xs text-red-400 flex items-center gap-1"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
                {errors.address.message as string}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Postal & Landmark */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Postal Code"
            fieldName="postalCode"
            placeholder="54000"
            register={register}
            errors={errors}
          />
          <InputField
            label="Landmark"
            fieldName="landmark"
            placeholder="Near mosque, petrol pump..."
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </motion.div>
  );
}

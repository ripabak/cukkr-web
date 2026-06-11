'use client';

interface PublicIdentityFormProps {
  name: string;
  email: string;
  emailRequired: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onContinue: () => void;
}

export function PublicIdentityForm({
  name,
  email,
  emailRequired,
  onNameChange,
  onEmailChange,
  onContinue,
}: PublicIdentityFormProps) {
  const emailLabel = emailRequired ? (
    <>
      Email <span className="text-[#ef4444]">*</span>
    </>
  ) : (
    <>
      Email <span className="text-xs font-normal text-[#9ca3af]">(optional)</span>
    </>
  );

  const disabled = emailRequired
    ? !name.trim() || !email.trim()
    : !name.trim();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium mb-1.5 text-[#1a1a1a]">
          Full Name <span className="text-[#ef4444]">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Ahmad Fauzi"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 border-[#ebebeb] text-[#1a1a1a] bg-white focus:border-[#ffc81e]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5 text-[#1a1a1a]">
          {emailLabel}
        </label>
        <input
          type="email"
          placeholder="e.g. ahmad@email.com"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border-2 border-[#ebebeb] text-[#1a1a1a] bg-white focus:border-[#ffc81e]"
        />
      </div>
      <button
        onClick={onContinue}
        disabled={disabled}
        className="w-full py-4 rounded-2xl font-black text-base mt-2 transition-opacity bg-[#ffc81e] text-[#1a1a1a] disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  );
}

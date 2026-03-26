import React from 'react';

export function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[12px] font-medium text-slate-200/90">{children}</span>;
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={[
        'w-full rounded-xl border border-slate-400/35 bg-slate-900/55 px-3 py-2 text-slate-100 outline-none',
        'focus:border-indigo-500/80',
        className || '',
      ].join(' ')}
    />
  );
}

// Alias used by node components.
export const Input = TextInput;

export function NumberInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  return <TextInput {...props} type="number" className={props.className} />;
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { className?: string }
) {
  const { className, ...rest } = props;
  return (
    <select
      {...rest}
      className={[
        'w-full rounded-xl border border-slate-400/35 bg-slate-900/55 px-3 py-2 text-slate-100 outline-none',
        'focus:border-indigo-500/80',
        className || '',
      ].join(' ')}
    />
  );
}


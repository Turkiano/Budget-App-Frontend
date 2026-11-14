type ErrorBannerProps = {
  message?: string | null;
  fieldErrors?: Record<string, string[]>;
  className?: string;
};

function formatFieldName(field: string): string {
  return field
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (char) => char.toUpperCase());
}

/**
 * Small shared renderer for RFC 7807 errors. Keeps the raw `traceId` out of
 * the UI while showing the server's `detail` and validation errors.
 */
export function ErrorBanner({
  message,
  fieldErrors,
  className,
}: ErrorBannerProps) {
  const entries = Object.entries(fieldErrors ?? {}).filter(
    ([, messages]) => messages.length > 0,
  );

  if (!message && entries.length === 0) return null;

  return (
    <div
      role="alert"
      className={`rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 ${
        className ?? ''
      }`}
    >
      {message ? <p className="font-medium">{message}</p> : null}

      {entries.length > 0 ? (
        <ul className="mt-1 list-inside list-disc space-y-1">
          {entries.map(([field, messages]) => (
            <li key={field}>
              {formatFieldName(field)}: {messages.join(' ')}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

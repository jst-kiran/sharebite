/**
 * Reusable Confirmation Modal Dialog.
 */
function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-dark/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="card !bg-white max-w-md w-full p-6 shadow-2xl space-y-4">
        <h3 className="font-display text-xl font-bold text-forest-dark">
          {title}
        </h3>

        <p className="text-sm text-ink/70 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink/10">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary !px-4 !py-2 text-xs"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-primary !px-4 !py-2 text-xs !bg-red-600 hover:!bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

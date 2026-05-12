interface SettingCardProps {
  settingTitle: string;
  settingDescription: string;
  btnText?: string;
  onEvent?: () => void;
}

export default function SettingCard({
  settingTitle,
  settingDescription,
  btnText,
  onEvent,
}: SettingCardProps) {
  return (
    <div className="setting-card">
      <h3 className="setting-title">{settingTitle}</h3>
      <p className="setting-description">{settingDescription}</p>

      <button
        className="setting-toggle-btn rounded-pill px-3 py-1 border-0"
        type="button"
        onClick={onEvent}
        aria-pressed="false">
        {btnText ?? 'Toggle'}
      </button>
    </div>
  );
}

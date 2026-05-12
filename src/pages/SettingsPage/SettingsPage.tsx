/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import SettingCard from '../../components/SettingCard/SettingCard';

export default function Settings() {
  return (
    <>
      <section className="d-flex">
        <div>
          <h1>Settings</h1>
          <p>This is the settings page.</p>
          <Link to="/">Go back to Home</Link>
        </div>

        <div>
          {/* <SettingCard
            settingTitle="Dark Mode"
            settingDescription="Toggle dark mode for the application"
            btnText="Toggle"
            onEvent={() => {
              document.body.classList.toggle('dark-mode');
            }}
          /> */}
        </div>
      </section>
    </>
  );
}

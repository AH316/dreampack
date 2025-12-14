import { getSettingsUncached } from '@/lib/settings'
import { AboutForm } from './about-form'

export default async function AboutPageEditor() {
  const settings = await getSettingsUncached()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Edit About Page</h1>
        <p className="text-neutral-600">
          Customize the content displayed on the About page.
        </p>
      </div>

      <AboutForm settingsId={settings.id} aboutPage={settings.aboutPage} />
    </div>
  )
}

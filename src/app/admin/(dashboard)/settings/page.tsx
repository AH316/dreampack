import { getSettingsUncached } from '@/lib/settings'
import { SettingsForm } from './settings-form'

export default async function SettingsPage() {
  const settings = await getSettingsUncached()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Site Settings</h1>
        <p className="text-neutral-600">
          Manage contact information, business hours, and social links.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  )
}

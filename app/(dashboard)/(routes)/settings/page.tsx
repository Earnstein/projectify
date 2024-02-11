import Header from '@/components/Header'
import { Settings } from 'lucide-react'

const SettingPage = () => {
  return (
    <div>
        <Header
        title="Settings"
        description='Manage account settings'
        icon={Settings}
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
        />

        <div className='px-4 lg:px-8 space-y-4'>
            <p className='text-muted-foreground text-sm'>
                You are currently on a Free plan
            </p>
        </div>
    </div>
  )
}

export default SettingPage;
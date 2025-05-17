import { CheckCircleIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export const BadgeSuccess = ({ text }: { text: string }) => {
  return (
    <Badge
      variant='outline'
      className='border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [a&]:hover:bg-green-600/10 [a&]:hover:text-green-600/90 dark:[a&]:hover:bg-green-400/10 dark:[a&]:hover:text-green-400/90'
    >
      <CheckCircleIcon className='size-3' />
      {text ? text : "Success"}
    </Badge>
  )
}

export default BadgeSuccess

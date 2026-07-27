import { Suspense } from 'react'
import NewShopPage from '@/components/NewShopPage'

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>Loading...</div>}>
      <NewShopPage />
    </Suspense>
  )
}
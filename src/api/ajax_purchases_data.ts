export interface AjaxPurchasesData {
  count: string
  items: Item[]
  playerId: string
}

interface Item {
  id: string
  Seller_id: string
  type: string
  itemId: string
  currentPrice: string
  buyNowPrice: string
  numberOfItems: string
  completed: string
  startDate: string
  endDate: string
  hasBids: string
  categoryId: string
  itemName: string
  rarity: string
  depositTax: string
  Bidder_id: string
  currentBidder: string
  bidPrice: string
  remainingTime: string
  icon: string
  name: string
  bodyLocation: string
}

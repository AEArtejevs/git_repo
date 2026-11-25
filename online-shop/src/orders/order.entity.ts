export class OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number; // in cents, price of ONE product at the moment of ordering
}

export class Order {
    id: number;
    userId: number;
    status: 'PENDING' | 'PAID' | 'CANCELLED';
    total: number; // in cents
    createdAt: Date;
    items: OrderItem[];
}
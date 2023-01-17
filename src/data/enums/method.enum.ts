export enum MethodEnum {
    Pickup = 1,
    Delivery = 2,
    Dinein = 3,
    RoomService = 4,
}


export const methodKeys: Record<number, { key: string; defaultLabel: string; customKey: string }> = {
    1: { key: 'pickup', defaultLabel: 'Pickup', customKey: 'Pickup' },
    2: { key: 'delivery', defaultLabel: 'Delivery', customKey: 'Delivery' },
    3: { key: 'dinein', defaultLabel: 'Dine in' , customKey: 'Dinein'},
    4: { key: 'roomservice', defaultLabel: 'Room Service', customKey: 'Room' },
  };
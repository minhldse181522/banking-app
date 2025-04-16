export class BankAccount {
  constructor(
    public readonly ownerId: string,
    private balance: number = 0,
    public readonly id?: bigint,
  ) {}

  deposit(amount: number): void {
    if (amount < 0) throw new Error('Invalid deposit amount');
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

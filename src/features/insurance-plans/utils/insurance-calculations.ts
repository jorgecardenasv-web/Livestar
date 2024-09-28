export const calculatePremium = (sumInsured: number, paymentType: string): number => {
  return paymentType === 'Mensual' ? sumInsured / 240 : sumInsured / 20;
};
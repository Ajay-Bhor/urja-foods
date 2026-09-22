import express from 'express';

const router = express.Router();

/**
 * Feed estimation logic based on standard dairy and broiler nutritional guidelines
 */
router.post('/estimate', (req, res) => {
  const { type, count = 10, currentYield = 10, target = 'high_fat' } = req.body;
  const numCount = Math.max(1, parseInt(count, 10) || 1);

  if (type === 'dairy') {
    // Standard ration: base maintenance feed (~1.5-2kg) + ~400g per liter of milk
    const avgMilkPerCow = parseFloat(currentYield) || 10;
    const dailyFeedPerAnimal = 2.0 + avgMilkPerCow * 0.4; // kg per day
    const totalDailyFeed = +(dailyFeedPerAnimal * numCount).toFixed(1);
    const monthlyBags = Math.ceil((totalDailyFeed * 30) / 50); // 50kg bag
    
    // Projected yield improvement with Urja Supreme Gold or Malai Plus
    const estimatedFatGain = target === 'high_fat' ? '+0.4% to +0.8%' : '+0.2% to +0.5%';
    const estimatedMilkGain = +(avgMilkPerCow * 1.15).toFixed(1); // 15% increase
    const monthlyExtraMilkLiters = Math.round((estimatedMilkGain - avgMilkPerCow) * numCount * 30);
    const projectedExtraRevenue = monthlyExtraMilkLiters * 42; // Avg Rs 42/L in Maharashtra

    const recommendedProduct = target === 'high_fat' ? 'Urja Malai Plus (8000)' : 'Urja Supreme Gold (5000)';

    return res.json({
      success: true,
      data: {
        type: 'Dairy Cattle Feed',
        animalCount: numCount,
        dailyFeedKgPerAnimal: +dailyFeedPerAnimal.toFixed(2),
        totalDailyFeedKg: totalDailyFeed,
        monthlyFeedBags50kg: monthlyBags,
        recommendedProduct,
        estimatedFatGain,
        projectedMonthlyExtraMilkLiters: monthlyExtraMilkLiters,
        projectedMonthlyExtraIncomeRs: projectedExtraRevenue,
      },
    });
  } else if (type === 'broiler') {
    // Broiler calculation (approx 3.2 kg feed per bird to 2.2 kg weight over 35-40 days)
    const totalFeedKgPerBird = 3.3;
    const expectedFcr = 1.5;
    const totalFlockFeedKg = Math.round(numCount * totalFeedKgPerBird);
    const totalBags50kg = Math.ceil(totalFlockFeedKg / 50);
    const estimatedFlockBiomassKg = Math.round(numCount * 2.2);

    return res.json({
      success: true,
      data: {
        type: 'Broiler Contract Farming / Feed',
        flockSize: numCount,
        totalCycleFeedKg: totalFlockFeedKg,
        totalBags50kg,
        targetFcr: expectedFcr,
        projectedBiomassOutputKg: estimatedFlockBiomassKg,
        recommendedProduct: 'Urja Broiler Finisher-1 & High-Tech EC House Package',
      },
    });
  }

  res.status(400).json({ success: false, message: 'Invalid livestock type specified.' });
});

export default router;

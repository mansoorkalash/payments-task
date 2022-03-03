const { expect } = require('mochaccino');
const cmd = require('../../../../node_modules/hearst-automation/commands');
const paymentPageLocator = require('../../pageObjects/paymentPage/paymentPageLocator');

describe('Verify functionality of ToolTip', () => {
  it(`Verify American express hint appearers when the initial numbers of American express are entered @C6910 @smoke @paymentUI`, async () => {
    await cmd.navigateTo(
      'https://payments-ui.cdsshopqa.cdsglobalapps.net/?config_id=1003&prod_id_alias=WS1'
    );
    await cmd.sendKeys(paymentPageLocator.cardNumberInput, '34');
    await cmd.hoverOver(paymentPageLocator.tooltip);
    const AmericanCardVisibility = await cmd.isVisible(
      paymentPageLocator.americanCardTooltip
    );
    expect(AmericanCardVisibility).toBe(true);
  });

  it(`Verify hint for American and non American cards appear before entering any card number @C6912 @smoke @paymentUI`, async () => {
    await cmd.navigateTo(
      'https://payments-ui.cdsshopqa.cdsglobalapps.net/?config_id=1003&prod_id_alias=WS1'
    );
    await cmd.sendKeys(paymentPageLocator.cardNumberInput, '');
    await cmd.hoverOver(paymentPageLocator.tooltip);
    const AmericanCardVisibility = await cmd.isVisible(
      paymentPageLocator.americanCardTooltip
    );
    const nonAmericanCardVisibility = await cmd.isVisible(
      paymentPageLocator.nonAmericanCardTooltip
    );
    expect(AmericanCardVisibility).toBe(true);
    expect(nonAmericanCardVisibility).toBe(true);
  });

  it(`Verify non American express hint appearers when the initial numbers of non American express are entered @C6911 @smoke @paymentUI`, async () => {
    await cmd.navigateTo(
      'https://payments-ui.cdsshopqa.cdsglobalapps.net/?config_id=1003&prod_id_alias=WS1'
    );
    await cmd.sendKeys(paymentPageLocator.cardNumberInput, '54');
    await cmd.hoverOver(paymentPageLocator.tooltip);
    const nonAmericanCardVisibility = await cmd.isVisible(
      paymentPageLocator.nonAmericanCardTooltip
    );
    expect(nonAmericanCardVisibility).toBe(true);
  });
});

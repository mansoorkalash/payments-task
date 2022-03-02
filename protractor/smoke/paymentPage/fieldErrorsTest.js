const { expect } = require('mochaccino');
const cmd = require('../../../../node_modules/hearst-automation/commands');
const paymentPageLocator = require('../../pageObjects/paymentPage/paymentPageLocator');

describe('Verify functionality of Invalid card number', () => {
  it(`Should error appear when the Initial numbers of the not supported card are entered TAGS: @C6879 @smoke @paymentUI`, async () => {
    await cmd.navigateTo(
      'https://payments-ui.cdsshopqa.cdsglobalapps.net/?config_id=0aa1a3fb-5646-48ef-a15e-8eb6e593bdde&prod_id_alias=WS1'
    );
    await cmd.sendKeys(paymentPageLocator.cardNumber, '67');
    const invalidNumber = await cmd.getText(
      paymentPageLocator.invalidCardNumberLabel
    );
    expect(invalidNumber).toEqual('Maestro is not an accepted card.');
    const colorE = await cmd.get(paymentPageLocator.cardNumberLabel);
    const color = await colorE.getCssValue('color');
    expect(color).toBe('rgba(213, 0, 0, 1)');
    const border = await cmd.get(paymentPageLocator.cardNumberLabel);
    const borderColor = await border.getCssValue('border-color');
    expect(borderColor).toBe('rgb(213, 0, 0)');
  });
});

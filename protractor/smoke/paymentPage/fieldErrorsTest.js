const { expect } = require('mochaccino');
const cmd = require('../../../../node_modules/hearst-automation/commands');
const paymentPageLocator = require('../../pageObjects/paymentPage/paymentPageLocator');

describe('Verify functionality of Invalid card number', () => {
  it(`Should error appear when the Initial numbers of the not supported card are entered TAGS: @C6879 @smoke @paymentUI`, async () => {
    await cmd.navigateTo(
      'https://payments-ui.cdsshopqa.cdsglobalapps.net/?config_id=0aa1a3fb-5646-48ef-a15e-8eb6e593bdde&prod_id_alias=WS1'
    );
    await cmd.sendKeys(paymentPageLocator.cardNumberInput, '67');
    const invalidNumberText = await cmd.getText(
      paymentPageLocator.invalidCardNumberLabel
    );
    expect(invalidNumberText).toEqual('Maestro is not an accepted card.');
    const CardNumberLabel = await cmd.get(paymentPageLocator.cardNumberLabel);
    const colorCardNumberLabel = await CardNumberLabel.getCssValue('color');
    expect(colorCardNumberLabel).toBe('rgba(213, 0, 0, 1)');
    const BorderCardNumberInput = await cmd.get(
      paymentPageLocator.BorderCardNumberInput
    );
    const BorderCardNumberInputColor = await BorderCardNumberInput.getCssValue(
      'border-color'
    );
    expect(BorderCardNumberInputColor).toBe('rgb(209, 160, 160)');
  });

  it(`Should error appear when the Initial numbers of the not supported card are @C6885 @smoke @paymentUI`, async () => {
    await cmd.navigateTo(
      'https://payments-ui.cdsshopqa.cdsglobalapps.net/?config_id=0aa1a3fb-5646-48ef-a15e-8eb6e593bdde&prod_id_alias=WS1'
    );
    await cmd.sendKeys(paymentPageLocator.cardNumberInput, '378282246310005');
    const ama = await cmd.isVisible('#amex-icon');
    expect(ama).toBe(true);
    paymentPageLocator.cardsNotAppear.selector.forEach(async (card) => {
      const cardAppear = await cmd.isVisible(card);
      expect(cardAppear).toBe(false);
    });
    await cmd.sendKeys(paymentPageLocator.securityCodeInput, '123');
    await cmd.click(paymentPageLocator.expireDate);
    const securityCodeErrorText = await cmd.getText(
      paymentPageLocator.securityCodeLabelError
    );
    expect(securityCodeErrorText).toEqual('Enter a valid security code');
    const securityCodeErrorElement = await cmd.get(
      paymentPageLocator.securityCodeLabelError
    );
    const securityCodeErrorColor = await securityCodeErrorElement.getCssValue(
      'color'
    );
    expect(securityCodeErrorColor).toBe('rgba(213, 0, 0, 1)');
    const securityCodeContainer = await cmd.get(
      paymentPageLocator.securityCodeContainer
    );
    const borderSecurityColor = await securityCodeContainer.getCssValue(
      'color'
    );
    expect(borderSecurityColor).toBe('rgba(0, 0, 0, 1)');
  });
});

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

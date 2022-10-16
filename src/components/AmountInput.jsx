import "./AmountInput.css";

const AmountInput = ({ amount, onAmountInputChange, isAmountValid }) => {
  return (
    <div>
      <input
        type="number"
        placeholder="Please enter amount"
        value={amount}
        onChange={onAmountInputChange}
      />
      {!isAmountValid && (
        <div className="input-error-msg">Please enter a valid amount</div>
      )}
    </div>
  );
};

export default AmountInput;

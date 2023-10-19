function SellModal({ setModalIsOpen, setShouldReloadPage }) {

  function addToPortfolio() {
    setModalIsOpen(false)
    if (setShouldReloadPage) {
      setShouldReloadPage(true);
    }
  }

  function withdraw() {
    setModalIsOpen(false)
    if (setShouldReloadPage) {
      setShouldReloadPage(true);
    }
  }

  return (
    <div>
      <h2 className="title-sell-modal">Confirm Action</h2>
      <hr className="hr-sell-modal" />
      <div className="button-place">
        <button className="button margin-right" onClick={addToPortfolio}>Add To Portfolio</button>
        <button className="button" onClick={withdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default SellModal;
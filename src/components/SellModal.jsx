function SellModal({ setModalIsOpen, setShouldReloadPage }) {

  function addToPort() {
    setModalIsOpen(false)
    if (setShouldReloadPage) {
      setShouldReloadPage(true);
    }
  }

  function withDraw() {
    setModalIsOpen(false)
    if (setShouldReloadPage) {
      setShouldReloadPage(true);
    }
  }

  return (
    <div>
      <div className="button-place">
        <button className="button height" onClick={addToPort}>Add To Portefolio</button>
        <button className="button drop" onClick={withDraw}>WithDraw</button>
      </div>
    </div>
  );
}

export default SellModal;
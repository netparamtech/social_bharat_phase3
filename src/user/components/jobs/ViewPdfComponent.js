function ViewPdfComponent() {
    return (
      <PDFViewer width="100%" height="500px">
        <div>
          {/* This div should contain the content you want to convert to PDF */}
          {previewRef.current}
        </div>
      </PDFViewer>
    );
  }
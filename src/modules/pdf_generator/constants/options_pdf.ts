import { CreateOptions } from "html-pdf";

export const optionsPdf: CreateOptions = {
  header: {
    height: "80px",
    contents: `<div class="page_title">Header_Pdf</div>`,
  },
  width: "700px",
  quality: "75",
  zoomFactor: "1",
  format: "A4",
  type: "pdf",
  footer: {
    contents: {
      default: '<div class="page_title">Footer_Pdf</div>',
    },
  },
};

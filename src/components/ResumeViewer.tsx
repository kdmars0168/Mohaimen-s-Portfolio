import { useCallback, useEffect, useRef, useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

type PdfBundle = {
  Document: typeof import("react-pdf").Document;
  Page: typeof import("react-pdf").Page;
};

interface ResumeViewerProps {
  file: string;
  fileName: string;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;
const DEFAULT_MAX_SCALE = 0.85;

const clamp = (value: number) =>
  Math.max(MIN_SCALE, Math.min(MAX_SCALE, Math.round(value * 100) / 100));

export const ResumeViewer = ({ file, fileName }: ResumeViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const userAdjusted = useRef(false);
  const pageWidth = useRef(612);

  const [pdf, setPdf] = useState<PdfBundle | null>(null);
  const [failed, setFailed] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(DEFAULT_MAX_SCALE);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        try {
          const [reactPdf, worker] = await Promise.all([
            import("react-pdf"),
            import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
          ]);
          reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
          if (!cancelled) setPdf({ Document: reactPdf.Document, Page: reactPdf.Page });
        } catch {
          if (!cancelled) setFailed(true);
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  /** Default zoom: min(0.85, fit-width). */
  const fitWidthScale = useCallback(() => {
    const element = containerRef.current;
    if (!element) return DEFAULT_MAX_SCALE;
    return clamp(Math.min(DEFAULT_MAX_SCALE, (element.clientWidth - 24) / pageWidth.current));
  }, []);

  const applyDefaultZoom = useCallback(() => {
    if (userAdjusted.current) return;
    setScale(fitWidthScale());
  }, [fitWidthScale]);

  // Re-fit while the visitor has not chosen a zoom themselves.
  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => applyDefaultZoom());
    observer.observe(element);
    return () => observer.disconnect();
  }, [applyDefaultZoom]);

  useEffect(() => {
    if (!numPages) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const page = Number((entry.target as HTMLElement).dataset.page);
            if (page) setCurrent(page);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    pageRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [numPages, pdf]);

  const zoomBy = (delta: number) => {
    userAdjusted.current = true;
    setScale((previous) => clamp(previous + delta));
  };

  const useFitWidth = () => {
    userAdjusted.current = true;
    setScale(fitWidthScale());
  };

  if (failed) {
    return (
      <div className="rounded-xl border bg-card p-6" role="alert">
        <p className="text-sm text-muted-foreground">
          The embedded viewer could not load in this browser. You can open the PDF in a new tab or
          download it instead.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Open in a new tab ↗
          </a>
          <a href={file} download={fileName} className="text-sm font-medium text-primary hover:underline">
            Download the PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="rounded-xl border bg-card overflow-hidden">
      <div
        role="toolbar"
        aria-label="Résumé viewer controls"
        className="flex flex-wrap items-center gap-2 border-b p-2 bg-accent/30"
      >
        <button
          type="button"
          onClick={() => zoomBy(-0.15)}
          aria-label="Zoom out"
          className="h-9 w-9 rounded-md border bg-background text-lg leading-none hover:bg-accent transition-colors"
        >
          −
        </button>
        <span className="w-14 text-center text-xs tabular-nums" aria-hidden>
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomBy(0.15)}
          aria-label="Zoom in"
          className="h-9 w-9 rounded-md border bg-background text-lg leading-none hover:bg-accent transition-colors"
        >
          +
        </button>
        <button
          type="button"
          onClick={useFitWidth}
          className="h-9 px-3 rounded-md border bg-background text-sm hover:bg-accent transition-colors"
        >
          Fit width
        </button>
        <span className="ml-2 text-xs text-muted-foreground tabular-nums" aria-live="polite">
          {numPages ? `Page ${current} of ${numPages}` : "Loading…"}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <a
            className="h-9 px-3 inline-flex items-center rounded-md border bg-background text-sm hover:bg-accent transition-colors"
            href={file}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open ↗
          </a>
          <a
            className="h-9 px-3 inline-flex items-center rounded-md border bg-background text-sm hover:bg-accent transition-colors"
            href={file}
            download={fileName}
          >
            Download
          </a>
        </div>
      </div>

      <div
        className="max-h-[70vh] overflow-auto bg-accent/20 p-3"
        tabIndex={0}
        role="region"
        aria-label="Résumé pages — scroll to read, select text to copy"
      >
        {pdf ? (
          <pdf.Document
            file={file}
            onLoadSuccess={(document) => {
              setNumPages(document.numPages);
              void document.getPage(1).then((page) => {
                pageWidth.current = page.getViewport({ scale: 1 }).width;
                applyDefaultZoom();
              });
            }}
            onLoadError={() => setFailed(true)}
            loading={<p className="p-6 text-sm text-muted-foreground">Loading résumé…</p>}
            error={
              <p className="p-6 text-sm text-muted-foreground">
                The résumé could not be loaded. Open it in a new tab instead.
              </p>
            }
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                key={index}
                data-page={index + 1}
                ref={(node) => {
                  pageRefs.current[index] = node;
                }}
                className="mx-auto mb-3 w-fit last:mb-0 shadow-soft rounded-sm overflow-hidden"
              >
                <pdf.Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer
                  renderAnnotationLayer
                  loading={<p className="p-4 text-sm text-muted-foreground">Rendering page {index + 1}…</p>}
                />
              </div>
            ))}
          </pdf.Document>
        ) : (
          <p className="p-6 text-sm text-muted-foreground">Loading viewer…</p>
        )}
      </div>
    </div>
  );
};

import { useNavigate } from "react-router-dom";

import { Card, Footer, ToggleTheme } from "../components";
import { MdFileUpload } from "react-icons/md";

const Upload = () => {
  const navigate = useNavigate();

  const handleFileChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    const reader = new FileReader();

    reader.onload = async (event: ProgressEvent<FileReader>) => {
      // const buffer = event.target?.result
      // if (!SQL || !buffer) return

      // const db = new SQL.Database(new Uint8Array(buffer as ArrayBufferLike))

      // if (db) {
      // setDb(db)
      navigate("/");
      // }
    };

    reader.readAsArrayBuffer(file as Blob);
  };

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <ToggleTheme />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:px-[70px]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex w-full flex-col items-center justify-center">
                  <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
                    <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pb-4 pl-3 dark:!bg-navy-800">
                      <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-darkGray">
                        Upload your .fydb file to get started
                      </h5>
                      <p className="leading-1 mt-2 text-base font-normal text-gray-600">
                        Export from bluecoins settings if you have not already
                      </p>
                    </div>

                    <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
                      <label
                        htmlFor="dropzone-file"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
                      >
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                          <MdFileUpload className="text-[80px] text-brand-500 dark:text-darkGray" />
                          <h4 className="text-xl font-bold text-brand-500 dark:text-darkGray">
                            Upload Files
                          </h4>
                          <p className="mt-2 text-sm font-medium text-gray-600">
                            Only .fydb files are allowed
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept=".fydb"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </Card>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Upload;

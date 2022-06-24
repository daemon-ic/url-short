import { ChakraProvider, Flex, Input, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addUrlToDatabase, getRedirectData } from "./api/apiCalls";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [invalidDisplay, setInvalidDisplay] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    if (pathname) initRedirect(pathname);
  }, []);

  async function initRedirect(pathname) {
    // await getRedirectData(pathname);
    const newUrl = await getRedirectData(pathname);
    newUrl ? (window.location.href = newUrl) : (window.location.pathname = "/");
  }

  async function onSubmit(e, keypress) {
    if (keypress && e.key !== "Enter") return;

    if (invalidUrl(inputValue)) {
      setInputValue("");
      setShortUrl("");
      setInvalidDisplay(true);
      return;
    }

    setInvalidDisplay(false);
    const result = await addUrlToDatabase(inputValue);
    setInputValue("");
    setShortUrl(result);
  }

  function invalidUrl(url) {
    const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    return !valid;
  }

  function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).value;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log(`"${text}" was copied to clipboard.`);
      })
      .catch((err) => {
        console.error(`Error copying text to clipboard: ${err}`);
      });
  }

  return (
    <ChakraProvider>
      <Flex
        w="100vw"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        backgroundColor="#0093E9"
        backgroundImage="linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);"
        boxShadow="1px 5px 8px rgba(0, 0, 0, 0.1)"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bg="white"
          padding="20px"
          borderRadius="15px"
        >
          <Text
            fontSize="2xl"
            marginBottom="30px"
            fontWeight="bold"
            color="cyan.500"
          >
            URL Shrinker
          </Text>
          {invalidDisplay && (
            <Text fontSize="md" color="red.400">
              Please enter a valid link
            </Text>
          )}
          <Input
            w="30vw"
            placeholder="Enter URL here"
            onKeyDown={(e) => onSubmit(e, "KEYPRESS")}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Flex flexDirection={"row"} w="30vw">
            <Input
              id="short-url"
              fontSize="md"
              marginTop="20px"
              value={
                shortUrl
                  ? `
              ${window.location.hostname}${
                      window.location.port !== "80" &&
                      ":" + window.location.port
                    }/${shortUrl}`.trim()
                  : ""
              }
              disabled={shortUrl ? false : true}
            />
            <Button
              marginTop="20px"
              marginLeft="20px"
              onClick={() => copyToClipboard("short-url")}
              disabled={shortUrl ? false : true}
            >
              Copy
            </Button>
          </Flex>
          {/* {shortUrl ? (
           
          ) : (
            <Flex flexDirection={"row"} w="30vw">
              <Text fontSize="md" marginTop="20px" placeholder={"Short Url"}>
                Test
              </Text>
              <Button marginTop="20px" marginLeft="20px" disabled>
                Copy
              </Button>
            </Flex>
          )} */}
          <Button
            w="30vw"
            marginTop="10px"
            colorScheme="cyan"
            color="white"
            onClick={onSubmit}
          >
            {shortUrl ? (
              <Text>Shrink Another!</Text>
            ) : (
              <Text>Shrink My Link!</Text>
            )}
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;

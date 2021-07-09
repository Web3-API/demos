import { Uri, Web3ApiClient } from "@web3api/client-js";

export async function speak(
  uri: string,
  client: Web3ApiClient
): Promise<string> {
  const { data, errors } = await client.query<{
    speak: string
  }>({
    uri: `ens/rinkeby/${uri}`,
    query: `query {
      speak(arg: $arg)
    }`,
    variables: {
      arg: "Hello"
    }
  });

  if (errors || !data) {
    throw errors;
  }

  return data.speak;
}
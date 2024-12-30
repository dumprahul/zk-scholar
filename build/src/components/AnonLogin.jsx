import { useEffect } from 'react';
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
  useProver,
} from '@anon-aadhaar/react';

export default function Home() {
  // Access the Anon Aadhaar status
  const [anonAadhaar] = useAnonAadhaar();
  
  // Access the latest proof generated
  const [, latestProof] = useProver();

  useEffect(() => {
    // Log Anon Aadhaar status whenever it changes
    console.log('Anon Aadhaar status: ', anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <div>
      {/* LogInWithAnonAadhaar component */}
      {/* <h1>Anon Aadhaar Integration</h1> */}
      <LogInWithAnonAadhaar nullifierSeed={1234} fieldsToReveal={["revealAgeAbove18", "revealPinCode"]} _useTestAadhaar={true}/>

      {/* Display Anon Aadhaar status */}
      <p>Status: {anonAadhaar?.status}</p>

      <div>
        {/* Conditionally render proof if status is logged-in and proof is available */}
        {anonAadhaar?.status === 'logged-in' && (
          <>
            <p>✅ Proof is valid</p>
            {latestProof && (
              <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

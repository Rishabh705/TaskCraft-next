'use client'

import SuprSendInbox from '@suprsend/react-inbox';
import 'react-toastify/dist/ReactToastify.css';
import crypto from 'crypto';

const Inbox = () => {
    // Function to create HMAC hash
    const hmacRawUrlSafeBase64String = (distinctId: string, secret: string): string => {
        const hash = crypto
            .createHmac('sha256', secret)
            .update(distinctId)
            .digest('base64');
        return hash.trimEnd();
    };
    
    const distinctId = process.env.NEXT_PUBLIC_SUPRSEND_DISTINCT_ID ?? '';
    const secret = process.env.NEXT_PUBLIC_SUPRSEND_SECRET ?? '';
    const subscriberId = hmacRawUrlSafeBase64String(distinctId, secret);
    console.log(subscriberId);

    return (
        <SuprSendInbox
            workspaceKey={process.env.NEXT_PUBLIC_SUPRSEND_WORKSPACE_KEY ?? ''}
            subscriberId={subscriberId}
            distinctId={distinctId}
        />
    );
};

export default Inbox;

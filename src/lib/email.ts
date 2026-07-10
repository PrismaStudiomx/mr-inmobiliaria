import { Resend } from "resend";

type LeadField = {
  label: string;
  value?: string | null;
};

type SendLeadEmailParams = {
  subject: string;
  title: string;
  fields: LeadField[];
  message?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendLeadEmail({
  subject,
  title,
  fields,
  message,
}: SendLeadEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  if (!contactToEmail) {
    throw new Error("Missing CONTACT_TO_EMAIL");
  }

  if (!resendFromEmail) {
    throw new Error("Missing RESEND_FROM_EMAIL");
  }

  const resend = new Resend(resendApiKey);

  const fieldsHtml = fields
    .map((field) => {
      const value = field.value ? escapeHtml(field.value) : "No especificado";

      return `
        <tr>
          <td style="padding: 10px 0; font-weight: 700; color: #252525;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding: 10px 0; color: #555;">
            ${value}
          </td>
        </tr>
      `;
    })
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; background: #F7F3EA; padding: 32px;">
      <div style="max-width: 620px; margin: 0 auto; background: #FFFFFF; border-radius: 18px; padding: 32px; border: 1px solid rgba(0,0,0,0.08);">
        <p style="margin: 0 0 12px; color: #C9A24A; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
          MR Inmobiliaria
        </p>

        <h1 style="margin: 0 0 24px; color: #0B0B0B; font-size: 28px;">
          ${escapeHtml(title)}
        </h1>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          ${fieldsHtml}
        </table>

        ${
          message
            ? `
              <div style="margin-top: 24px; padding: 20px; background: #F7F3EA; border-radius: 14px;">
                <p style="margin: 0 0 8px; font-weight: 700; color: #252525;">
                  Mensaje
                </p>
                <p style="margin: 0; color: #555; line-height: 1.6;">
                  ${escapeHtml(message)}
                </p>
              </div>
            `
            : ""
        }
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: resendFromEmail,
    to: contactToEmail,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
import React from "react";
import Copyright from "@theme-original/Footer/Copyright";
import type CopyrightType from "@theme/Footer/Copyright";
import type { WrapperProps } from "@docusaurus/types";
import styles from "./index.module.css";
import socialLinks from "../../../../config/social-links.json";

type Props = WrapperProps<typeof CopyrightType>;

export default function CopyrightWrapper(props: Props): JSX.Element {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.copyright}>
          <img className={styles.logo} src="/img/Logo.aelf.svg" />
          <Copyright {...props} />
        </div>
        <div className={styles.social}>
          {socialLinks.links.map((i, key) => (
            <a
              key={key}
              href={i.href}
              target="_blank"
              rel="noopener noreferrer"
              title={i.label}
            >
              {i.icon ? (
                <img src={i.icon} className={styles.img} />
              ) : (
                <span className={styles.icon}>?</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
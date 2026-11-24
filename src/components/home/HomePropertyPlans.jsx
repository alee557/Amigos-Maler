export default function HomePropertyPlans() {
  return (
    <section className="plans-section" id="plans">
      <div className="plans-header">
        <div className="plans-header-grid">
          <h2>Your property care program, structured for every level of ownership.</h2>
          <div className="plans-header-side">
            <p>
              Choose the level of monitoring, planning and response that fits your
              home, villa or managed portfolio.
            </p>
            <a className="plans-overview-cta" href="/property-value-preservation#plans">
              <span>Request consultation</span>
              <i aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="plans-grid plans-overview-list">
        {/* (01) BASIC HOME CARE */}
        <article className="plan-card plan-overview-card" id="home-plan-basic">
          <div className="plan-overview-index">(01)</div>
          <div className="plan-overview-main">
            <span className="plan-name">BASIC</span>
            <h3>Basic Home Care</h3>
            <p>
              Essential upkeep for classic homeowners who want a clear yearly check
              and professional recommendations.
            </p>
            <div className="price">
              <small>CHF</small>
              <strong data-month="89" data-year="890">89</strong>
              <span className="price-period">/mo</span>
            </div>
            <ul>
              <li>Annual property inspection</li>
              <li>Small repairs</li>
              <li>Prioritized recommendations</li>
              <li>Personal documentation</li>
            </ul>
          </div>
          <div className="plan-overview-action">
            <a href="/property-value-preservation#home-basic">
              <button type="button">Select Basic</button>
            </a>
            <i aria-hidden="true" className="plan-detail-mark"></i>
          </div>
        </article>

        {/* (02) PLUS HOME CARE */}
        <article className="plan-card featured plan-overview-card" id="home-plan-plus">
          <div className="plan-overview-index">(02)</div>
          <div className="plan-overview-main">
            <span className="popular">MOST POPULAR</span>
            <span className="plan-name">PLUS</span>
            <h3>Plus Home Care</h3>
            <p>
              The complete program for discerning owners who want proactive planning,
              faster support and service advantages.
            </p>
            <div className="price">
              <small>CHF</small>
              <strong data-month="199" data-year="1990">199</strong>
              <span className="price-period">/mo</span>
            </div>
            <ul>
              <li>Semi-annual property inspection</li>
              <li>Small repairs included</li>
              <li>Seasonal maintenance work</li>
              <li>Prioritized recommendations</li>
              <li>Personal support</li>
            </ul>
          </div>
          <div className="plan-overview-action">
            <a href="/property-value-preservation#home-plus">
              <button type="button">Select Plus</button>
            </a>
            <i aria-hidden="true" className="plan-detail-mark"></i>
          </div>
        </article>

        {/* (03) PREMIUM HOME CARE */}
        <article className="plan-card plan-overview-card" id="home-plan-premium">
          <div className="plan-overview-index">(03)</div>
          <div className="plan-overview-main">
            <span className="plan-name">PREMIUM</span>
            <h3>Premium Home Care</h3>
            <p>
              Signature care for luxury villas and institutions that need personal
              guidance and long-term value strategy.
            </p>
            <div className="price">
              <small>CHF</small>
              <strong data-month="399" data-year="3990">399</strong>
              <span className="price-period">/mo</span>
            </div>
            <ul>
              <li>Monthly property inspection</li>
              <li>Repairs and maintenance</li>
              <li>Early detection of damage</li>
              <li>Individual maintenance plan</li>
              <li>Direct contact person</li>
            </ul>
          </div>
          <div className="plan-overview-action">
            <a href="/property-value-preservation#home-premium">
              <button type="button">Select Premium</button>
            </a>
            <i aria-hidden="true" className="plan-detail-mark"></i>
          </div>
        </article>
      </div>

      <p style={{padding:"24px", margin:0, textAlign:"center"}}>Managing a business property? <a href="/property-value-preservation#business-care">Explore Business Flex and Business Partner</a></p>
      <style dangerouslySetInnerHTML={{ __html: `
        #plans.plans-section .popular {
          position: static !important;
          top: auto !important;
          left: auto !important;
          transform: none !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: fit-content !important;
          max-width: fit-content !important;
          min-height: 0 !important;
          height: auto !important;
          padding: 6px 14px !important;
          margin: 0 0 4px 0 !important;
          border: 1px solid rgba(255, 190, 27, .65) !important;
          border-radius: 999px !important;
          background: rgba(255, 190, 27, .12) !important;
          color: #ffbe1b !important;
          -webkit-text-fill-color: #ffbe1b !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          letter-spacing: .18em !important;
          line-height: 1.2 !important;
          text-transform: uppercase !important;
          text-shadow: none !important;
          box-shadow: none !important;
          white-space: nowrap !important;
          box-sizing: border-box !important;
        }
        #plans.plans-section .plan-overview-main,
        #plans.plans-section .plan-overview-main ul,
        #plans.plans-section .plan-overview-main li {
          text-align: left !important;
          justify-items: start !important;
          align-items: flex-start !important;
        }
        #plans.plans-section .plan-overview-main ul {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(190px, 1fr)) !important;
          gap: 18px clamp(38px, 5vw, 96px) !important;
          max-width: 820px !important;
          margin: clamp(10px, 1vw, 18px) 0 0 !important;
          padding: 0 !important;
          list-style: none !important;
        }
        @media (max-width: 640px) {
          #plans.plans-section .plan-overview-main ul {
            grid-template-columns: 1fr !important;
          }
        }
        #plans.plans-section .plan-overview-main li {
          display: block !important;
          position: relative !important;
          width: 100% !important;
          justify-self: start !important;
          align-self: flex-start !important;
          padding: 0 0 0 28px !important;
          margin: 0 !important;
          text-align: left !important;
        }
        #plans.plans-section .plan-overview-main li::before {
          content: "" !important;
          position: absolute !important;
          top: .48em !important;
          left: 0 !important;
          right: auto !important;
        }
        @media (max-width: 1100px) {
          #plans.plans-section {
            height: auto !important;
            min-height: 0 !important;
            padding: 72px 0 0 !important;
            overflow: hidden !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-header {
            width: min(840px, calc(100% - 48px)) !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            margin: 0 auto 56px !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-header-grid {
            position: static !important;
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
            grid-template-areas: "title" "side" !important;
            grid-auto-rows: auto !important;
            align-items: start !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            gap: 20px !important;
            overflow: visible !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-header h2 {
            grid-area: title !important;
            width: 100% !important;
            max-width: 760px !important;
            margin: 0 !important;
            font-size: clamp(34px, 4.6vw, 46px) !important;
            line-height: 1.08 !important;
            word-break: normal !important;
            overflow-wrap: normal !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-header-side,
          #plans.plans-section .plans-header-side {
            grid-area: side !important;
            position: static !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            gap: 24px !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            transform: none !important;
          }
          #plans.plans-section .plans-header p {
            width: 100% !important;
            max-width: 560px !important;
            margin: 0 !important;
            font-size: clamp(17px, 2.2vw, 21px) !important;
            line-height: 1.5 !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta,
          #plans.plans-section .plans-overview-cta {
            position: relative !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 14px !important;
            width: auto !important;
            max-width: 100% !important;
            min-height: 0 !important;
            margin: 8px 0 0 !important;
            padding: 0 !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: transparent !important;
            background-image: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            transform: none !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 10 !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta span,
          #plans.plans-section .plans-overview-cta span {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 58px !important;
            height: auto !important;
            padding: 0 32px !important;
            border-radius: 999px !important;
            background: #fff !important;
            color: #171717 !important;
            -webkit-text-fill-color: #171717 !important;
            font-size: 16px !important;
            font-weight: 900 !important;
            line-height: 1 !important;
            text-align: center !important;
            white-space: nowrap !important;
            box-shadow: 0 14px 30px rgba(0, 0, 0, .10) !important;
            border: 0 !important;
            visibility: visible !important;
            opacity: 1 !important;
            transition: background .28s ease, color .28s ease, transform .28s ease, box-shadow .28s ease !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta i,
          #plans.plans-section .plans-overview-cta i {
            display: inline-grid !important;
            width: 58px !important;
            height: 58px !important;
            flex-shrink: 0 !important;
            place-items: center !important;
            border-radius: 50% !important;
            background: #fff !important;
            box-shadow: 0 14px 30px rgba(0, 0, 0, .10) !important;
            border: 0 !important;
            visibility: visible !important;
            opacity: 1 !important;
            transition: background .28s ease, transform .28s ease, box-shadow .28s ease !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta i::before,
          #plans.plans-section .plans-overview-cta i::before {
            content: "" !important;
            display: block !important;
            width: 13px !important;
            height: 13px !important;
            border-top: 3.5px solid #171717 !important;
            border-right: 3.5px solid #171717 !important;
            transform: translateX(-2px) rotate(45deg) !important;
            transition: border-color .28s ease, transform .28s ease !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta:hover span,
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta:hover i,
          #plans.plans-section .plans-overview-cta:hover span,
          #plans.plans-section .plans-overview-cta:hover i {
            background: linear-gradient(105deg, #ffbe1b 0%, #ff8d39 50%, #ff5677 100%) !important;
            color: #fff !important;
            -webkit-text-fill-color: #fff !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta:hover i::before,
          #plans.plans-section .plans-overview-cta:hover i::before {
            border-color: #fff !important;
          }
          #plans.plans-section .plans-grid.plans-overview-list {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          #plans.plans-section .plans-grid.plans-overview-list > .plan-card.plan-overview-card:nth-child(n) {
            position: relative !important;
            inset: auto !important;
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
            grid-template-areas: "index" "main" "action" !important;
            width: 100% !important;
            max-width: none !important;
            height: auto !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: clamp(44px, 7vw, 72px) clamp(28px, 6vw, 64px) !important;
            gap: 28px clamp(20px, 4vw, 44px) !important;
            border-radius: 0 !important;
            transform: none !important;
            overflow: hidden !important;
          }
          #plans.plans-section .plan-overview-index {
            grid-area: index !important;
            grid-column: auto !important;
            grid-row: auto !important;
            align-self: start !important;
            font-size: clamp(24px, 3.5vw, 34px) !important;
          }
          #plans.plans-section .plan-overview-main {
            grid-area: main !important;
            grid-column: auto !important;
            grid-row: auto !important;
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            justify-self: stretch !important;
            transform: none !important;
          }
          html body[data-page="home"] section#plans.plans-section .plan-overview-main h3 {
            width: 100% !important;
            max-width: none !important;
            margin: 12px 0 20px !important;
            font-size: clamp(34px, 4.4vw, 44px) !important;
            line-height: 1.04 !important;
            word-break: normal !important;
            overflow-wrap: normal !important;
          }
          #plans.plans-section .plan-overview-main p {
            width: 100% !important;
            max-width: 620px !important;
            margin: 0 !important;
            font-size: clamp(17px, 2.4vw, 21px) !important;
            line-height: 1.5 !important;
          }
          #plans.plans-section .price {
            display: flex !important;
            align-items: baseline !important;
            flex-wrap: nowrap !important;
            width: auto !important;
            max-width: 100% !important;
            margin: 28px 0 0 !important;
            gap: 8px !important;
            white-space: nowrap !important;
          }
          #plans.plans-section .price strong {
            font-size: clamp(58px, 11vw, 96px) !important;
            line-height: .9 !important;
          }
          #plans.plans-section .plan-overview-main ul {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            width: 100% !important;
            max-width: 700px !important;
            margin: 36px 0 0 !important;
            gap: 18px 32px !important;
          }
          #plans.plans-section .plan-overview-main li {
            min-width: 0 !important;
            font-size: clamp(16px, 2vw, 19px) !important;
            line-height: 1.35 !important;
            white-space: normal !important;
          }
          #plans.plans-section .plan-overview-action {
            grid-area: action !important;
            grid-column: auto !important;
            grid-row: auto !important;
            justify-self: start !important;
            width: min(100%, 360px) !important;
            margin: 8px 0 0 !important;
          }
          #plans.plans-section .plan-overview-action a,
          #plans.plans-section .plan-overview-action button {
            width: 100% !important;
            max-width: 360px !important;
          }
        }
        @media (max-width: 700px) {
          #plans.plans-section {
            padding-top: 52px !important;
          }
          #plans.plans-section .plans-header {
            width: calc(100% - 32px) !important;
            margin-bottom: 40px !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-header h2 {
            font-size: clamp(30px, 8vw, 38px) !important;
          }
          #plans.plans-section .plans-header-side,
          html body[data-page="home"] section#plans.plans-section .plans-header-side {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            gap: 20px !important;
            width: 100% !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta,
          #plans.plans-section .plans-overview-cta {
            gap: 10px !important;
            margin: 4px 0 0 !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta span,
          #plans.plans-section .plans-overview-cta span {
            min-height: 54px !important;
            padding: 0 clamp(18px, 4vw, 24px) !important;
            font-size: 15px !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta i,
          #plans.plans-section .plans-overview-cta i {
            width: 54px !important;
            height: 54px !important;
          }
          html body[data-page="home"] section#plans.plans-section .plans-overview-cta i::before,
          #plans.plans-section .plans-overview-cta i::before {
            width: 12px !important;
            height: 12px !important;
            border-top: 3px solid #171717 !important;
            border-right: 3px solid #171717 !important;
          }
          #plans.plans-section .plans-grid.plans-overview-list > .plan-card.plan-overview-card:nth-child(n) {
            grid-template-columns: minmax(0, 1fr) !important;
            grid-template-areas: "index" "main" "action" !important;
            padding: 40px 24px 48px !important;
            gap: 22px !important;
          }
          html body[data-page="home"] section#plans.plans-section .plan-overview-main h3 {
            font-size: clamp(30px, 8.5vw, 38px) !important;
          }
          #plans.plans-section .price strong {
            font-size: clamp(56px, 20vw, 82px) !important;
          }
          #plans.plans-section .plan-overview-main ul {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 16px !important;
          }
          #plans.plans-section .plan-overview-action {
            width: 100% !important;
          }
        }
        @media (max-width: 1100px) {
          #plans #home-plan-basic,
          #plans #home-plan-plus,
          #plans #home-plan-premium {
            grid-template-columns: minmax(0, 1fr) !important;
            grid-template-areas: "index" "main" "action" !important;
            min-height: 0 !important;
            padding: clamp(40px, 6vw, 60px) clamp(24px, 6vw, 60px) !important;
            gap: 24px !important;
          }
          #plans #home-plan-basic > .plan-overview-index,
          #plans #home-plan-plus > .plan-overview-index,
          #plans #home-plan-premium > .plan-overview-index,
          #plans #home-plan-basic > .plan-overview-main,
          #plans #home-plan-plus > .plan-overview-main,
          #plans #home-plan-premium > .plan-overview-main,
          #plans #home-plan-basic > .plan-overview-action,
          #plans #home-plan-plus > .plan-overview-action,
          #plans #home-plan-premium > .plan-overview-action {
            grid-column: 1 !important;
            grid-row: auto !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            transform: none !important;
          }
          #plans #home-plan-basic > .plan-overview-main,
          #plans #home-plan-plus > .plan-overview-main,
          #plans #home-plan-premium > .plan-overview-main {
            justify-self: stretch !important;
          }
          #plans #home-plan-basic .plan-overview-main h3,
          #plans #home-plan-plus .plan-overview-main h3,
          #plans #home-plan-premium .plan-overview-main h3 {
            font-size: clamp(34px, 4.4vw, 44px) !important;
          }
          #plans #home-plan-basic .plan-overview-main p,
          #plans #home-plan-plus .plan-overview-main p,
          #plans #home-plan-premium .plan-overview-main p {
            max-width: 700px !important;
            font-size: clamp(17px, 2.2vw, 21px) !important;
          }
          #plans #home-plan-basic .plan-overview-main ul,
          #plans #home-plan-plus .plan-overview-main ul,
          #plans #home-plan-premium .plan-overview-main ul {
            width: 100% !important;
            max-width: 760px !important;
            margin-top: 32px !important;
          }
          #plans #home-plan-basic > .plan-overview-action,
          #plans #home-plan-plus > .plan-overview-action,
          #plans #home-plan-premium > .plan-overview-action {
            justify-self: start !important;
            width: min(100%, 360px) !important;
          }
        }
        @media (max-width: 700px) {
          #plans #home-plan-basic,
          #plans #home-plan-plus,
          #plans #home-plan-premium {
            padding: 40px 24px 48px !important;
          }
          #plans #home-plan-basic .plan-overview-main h3,
          #plans #home-plan-plus .plan-overview-main h3,
          #plans #home-plan-premium .plan-overview-main h3 {
            font-size: clamp(30px, 8.5vw, 38px) !important;
          }
          #plans #home-plan-basic .plan-overview-main ul,
          #plans #home-plan-plus .plan-overview-main ul,
          #plans #home-plan-premium .plan-overview-main ul {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          #plans #home-plan-basic > .plan-overview-action,
          #plans #home-plan-plus > .plan-overview-action,
          #plans #home-plan-premium > .plan-overview-action {
            width: 100% !important;
          }
        }
      ` }} />
    </section>
  );
}

export interface CoreValue {
  icon: string;
  title: string;
  desc: string;
  bg: string;
}

export interface OfferItem {
  title: string;
}

export interface OfferCategory {
  section: string;
  items: OfferItem[];
}

export interface About {
  _id: string;
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  whatWeOffer: OfferCategory[];
}

export interface AboutInput {
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  whatWeOffer: OfferCategory[];
}



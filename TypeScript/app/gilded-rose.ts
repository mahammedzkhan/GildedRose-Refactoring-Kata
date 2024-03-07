export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  maxQuality: number = 50;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private isElementQualityLowerThanMaxQuality(element: Item) {
    return element.quality < this.maxQuality
  }

  private hasQuality(item: Item) {
    return item.quality > 0;
  }

  private isLegendaryItem(item: Item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }


  private updateQualityForAgedBrieOrBackstage(element: Item) {
    const isElementQualityLowerThanMaxQuality = this.isElementQualityLowerThanMaxQuality(element)
    if (isElementQualityLowerThanMaxQuality) {
      element.quality += 1
      if (element.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (element.sellIn < 11) {
          element.quality += 1
        }
        if (element.sellIn < 6) {
          element.quality += 1
        }
      }
    }
  }

  private updateQualityForSellInPassed(item: Item, itemHasSomeQuality: boolean) {
    if (item.name === 'Aged Brie') {
      if (item.quality < this.maxQuality) {
        item.quality += 1
      }
    } else if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (itemHasSomeQuality && !this.isLegendaryItem(item)) {
        item.quality -= 1
      }
    } else {
      item.quality = 0
    }
  }

  updateQuality() {
    for (const item of this.items) {
      const itemHasSomeQuality = this.hasQuality(item)
      if (item.name === 'Aged Brie' || item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateQualityForAgedBrieOrBackstage(item);
      } else if (itemHasSomeQuality && !this.isLegendaryItem(item)) {
        item.quality -= 1
      }
      if (!this.isLegendaryItem(item)) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        this.updateQualityForSellInPassed(item, itemHasSomeQuality);
      }
    }

    return this.items;
  }
}

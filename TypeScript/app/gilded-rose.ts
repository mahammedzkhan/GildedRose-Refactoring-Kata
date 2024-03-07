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

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const element of this.items) {
      if (element.name != 'Aged Brie' && element.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (element.quality > 0) {
          if (element.name != 'Sulfuras, Hand of Ragnaros') {
            element.quality = element.quality - 1
          }
        }
      } else if (element.quality < 50) {
        element.quality = element.quality + 1
        if (element.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (element.sellIn < 11) {
            if (element.quality < 50) {
              element.quality = element.quality + 1
            }
          }
          if (element.sellIn < 6) {
            if (element.quality < 50) {
              element.quality = element.quality + 1
            }
          }
        }
      }
      if (element.name != 'Sulfuras, Hand of Ragnaros') {
        element.sellIn = element.sellIn - 1;
      }
      if (element.sellIn < 0) {
        if (element.name != 'Aged Brie') {
          if (element.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (element.quality > 0) {
              if (element.name != 'Sulfuras, Hand of Ragnaros') {
                element.quality = element.quality - 1
              }
            }
          } else {
            element.quality = element.quality - element.quality
          }
        } else if (element.quality < 50) {
          element.quality = element.quality + 1
        }
      }
    }

    return this.items;
  }
}

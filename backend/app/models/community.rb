class Community < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships, source: :user
  has_many :playlists, dependent: :destroy
  has_many :playlist_tunes, through: :playlists, source: :tune
  has_many :comments, dependent: :destroy

  validates :name,    presence: true, length: { maximum: 40 }
  validates :introduction, length: { maximum: 160 }
end

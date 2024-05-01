class CreateChecks < ActiveRecord::Migration[7.0]
  def change
    create_table :checks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tune, null: false, foreign_key: true
      t.boolean :active

      t.timestamps
    end
  end
end

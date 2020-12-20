class CreateSearchHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :search_histories do |t|
      t.string :search_key
      t.integer :user_id

      t.timestamps
    end
  end
end
